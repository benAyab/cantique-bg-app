const License = require('../daos/dao.license');

exports.createLicense = function(req, res){
    if(req.body.serial){

        let license = {
            serial: req.body.serial,
            isActive: false 
        }

        License.create(license, function(err, license){
            if(err){
                res.status(500).json({ error: err });
            }
            if(license){
                res.status(201).json({msg: 'Saved successfull !'});
            }
        });
    }
    else{
        res.status(400).json({error: 'Missing serial value'})
    }
}

exports.getLicenses = function(req, res){

    License.findAll({}, ['-_id', '-__v', '-createdAt'], function(err, licenses){
        if(err){
           return res.status(500).json({msg: err});
        }
        if(licenses){
            res.status(200).json({msg: licenses});
        }else{
            res.status(204).json({ msg: [] });
        }
    })
}

exports.getLicenseBySerial = function(req, res){
    
    if(req.params.serial){
        License.findBySerial({serial: req.params.serial}, ['-_id', '-__v', '-createdAt'], function(err, license){
            if(err){
                return res.status(500).json({error: err});
            }
            if(license){
                res.status(200).json({msg: license, isEmpty: false});
            }else{
                res.status(200).json({msg: "Empty result", isEmpty: true});
            }
        })
    }else{
        res.status(400).json({error: "Valeurs manquantes"});
    }
}

exports.updateLicense = function(req, res){
    if(req.params.serial ){

        const _date = new  Date();
        const MS_IN_YEAR = 2*365*24*3600*1000;
        const expitationDateMs = _date.getTime() + MS_IN_YEAR;

        License.update({serial: req.params.serial}, { isActive: true, expiredate: new Date(expitationDateMs) }, function(err, license){
            if(err){
                return res.status(500).json({error: err});
            }
            res.status(202).json({msg: license})
        })
    }else{
        res.status(400).json({error: true, msg: 'Valeurs manquantes'});
    }
}

exports.deleteLicense = function(req, res){

    if(req.params.serial){
        License.deleteItem({serial: req.params.serial}, function(err){
            if(err){ 
                return res.status(500).json({error: err});
            }
            res.status(200).json({msg: `License supprimée !`});
        })
    }else{
        return res.status(400).json({msg: "Missing params"});
    }
} 