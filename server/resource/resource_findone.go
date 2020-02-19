package resource

import (
	"github.com/Masterminds/squirrel"
	"github.com/artpar/api2go"
	"github.com/daptin/daptin/server/auth"
	"github.com/pkg/errors"
	//"strings"
	log "github.com/sirupsen/logrus"
)

// FindOne returns an object by its ID
// Possible Responder success status code 200
func (dr *DbResource) FindOne(referenceId string, req api2go.Request) (api2go.Responder, error) {

	if referenceId == "mine" && dr.tableInfo.TableName == "user_account" {
		log.Printf("Request for mine")
		sessionUser := req.PlainRequest.Context().Value("user")
		if sessionUser != nil {
			authUser := sessionUser.(*auth.SessionUser)
			log.Printf("Overrider reference id mine with %v", authUser.UserReferenceId)
			referenceId = authUser.UserReferenceId
		}
	}

	for _, bf := range dr.ms.BeforeFindOne {
		//log.Printf("Invoke BeforeFindOne [%v][%v] on FindAll Request", bf.String(), dr.model.GetName())
		r, err := bf.InterceptBefore(dr, &req, []map[string]interface{}{
			{
				"reference_id": referenceId,
				"__type":       dr.model.GetName(),
			},
		})
		if err != nil {
			log.Printf("Error from BeforeFindOne[%s][%s] middleware: %v", bf.String(), dr.model.GetName(), err)
			return nil, err
		}
		if r == nil {
			return nil, errors.New("Cannot find this object")
		}
	}

	modelName := dr.model.GetName()
	log.Printf("Find [%s] by id [%s]", modelName, referenceId)
	//
	//if strings.Index(modelName, "_has_") > 0 {
	//	parts := strings.Split(modelName, "_has_")
	//}

	// todo: change this hardcode default en language and move to config store as part of maybe @resource.TableInfo
	languagePreferences := req.PlainRequest.Context().Value("language_preference").([]string)

	if languagePreferences != nil && len(languagePreferences) > 0 {
		log.Printf("Language preference: %v", languagePreferences)
	}

	data, include, err := dr.GetSingleRowByReferenceId(modelName, referenceId)

	if len(languagePreferences) > 0 {
		for _, lang := range languagePreferences {
			data_i18n_id, err := dr.GetIdByWhereClause(modelName+"_i18n", squirrel.Eq{
				"translation_reference_id": data["id"],
				"language_id":              lang,
			})
			if err == nil && len(data_i18n_id) > 0 {
				for _, data_i18n := range data_i18n_id {
					translatedObj, err := dr.GetIdToObject(modelName+"_i18n", data_i18n)
					CheckErr(err, "Failed to fetch translated object for [%v][%v][%v]", modelName, lang, data["id"])
					for colName, valName := range translatedObj {
						if IsStandardColumn(colName) {
							continue
						}
						if valName == nil {
							continue
						}
						data[colName] = valName
					}
				}
				break
			} else {
				CheckErr(err, "No translated rows for [%v][%v][%v]", modelName, referenceId, lang)
			}
		}
	}

	//log.Printf("Single row result: %v", data)
	for _, bf := range dr.ms.AfterFindOne {
		//log.Printf("Invoke AfterFindOne [%v][%v] on FindAll Request", bf.String(), modelName)

		results, err := bf.InterceptAfter(dr, &req, []map[string]interface{}{data})
		if len(results) != 0 {
			data = results[0]
		} else {
			log.Printf("No results after executing: [%v]", bf.String())
			data = nil
		}
		if err != nil {
			log.Printf("Error from AfterFindOne middleware: %v", err)
		}
		include, err = bf.InterceptAfter(dr, &req, include)

		if err != nil {
			log.Printf("Error from AfterFindOne middleware: %v", err)
		}
	}

	delete(data, "id")
	//delete(data, "deleted_at")

	infos := dr.model.GetColumns()
	var a = api2go.NewApi2GoModel(dr.model.GetTableName(), infos, dr.model.GetDefaultPermission(), dr.model.GetRelations())
	a.Data = data

	for _, inc := range include {
		incType := inc["__type"].(string)

		if BeginsWith(incType, "image.") || BeginsWith(incType, "file.") {
			a.Includes = append(a.Includes, api2go.NewApi2GoModelWithData(incType, nil, 0, nil, inc))
		} else {
			p, ok := inc["permission"].(int64)
			if !ok {
				log.Printf("Failed to convert [%v] to permission: %v", inc["permission"], inc["__type"])
				p = 0
			}

			a.Includes = append(a.Includes, api2go.NewApi2GoModelWithData(incType, dr.Cruds[incType].model.GetColumns(), int64(p), dr.Cruds[incType].model.GetRelations(), inc))
		}

	}

	return NewResponse(nil, a, 200, nil), err
}
