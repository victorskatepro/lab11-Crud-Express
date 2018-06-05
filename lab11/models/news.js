var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/blog');


var news_schema = new Schema({
            titulo: String,
            descripcion: String,
            categoria: String,
            fecha: String,
            comentarios : [{ autor: String, mensaje : String, fecha : String}]
});
new_model = mongoose.model('noticias', news_schema, 'noticias');

module.exports = {
    show: function (req, res) {
        if (req.query._id == null) {
            new_model.find({}, function (err, items) {
                if (!err) {
                    //res.send(items);
                    res.render('index', {data: items});
                } else {
                    return console.log(err);
                }
            });
        }
    },
    create: function (req, res) {
        var notice = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            categoria: req.body.categoria,
            fecha: new Date()
        }
        var nuevo =  new new_model(notice).save();
        res.redirect('notice');
    },
    showUpdate: function (req, res) {
        new_model.findOne({_id: req.query._id}, function (err, notice) {
            if (notice != null ){
                res.render('notice_edit', {data:notice});
            }
        });
    },
    update : function (req, res) {
        new_model.findOne({_id: req.query._id}, function (err, notice) {
            notice.titulo = req.body.titulo;
            notice.descripcion = req.body.descripcion;
            notice.categoria = req.body.categoria;
            notice.save();
            res.redirect('/notice');
        });
    },
    delete : function (req, res) {
        new_model.findOne({_id: req.query._id},function (err,notice) {
            notice.remove();
            new_model.find({}, function (err, items) {
                if (!err) {
                    //res.send(items);
                    res.render('index', {data: items});
                } else {
                    return console.log(err);
                }
            });
        });
    },
    showComents : function (req, res) {
        new_model.findOne({_id: req.query._id}, function (err, notice) {
            if (notice != null ){
                res.render('new_detail', {data:notice});
            }
        });
    },
    createCommentView : function (req, res) {
        new_model.findOne({_id: req.query._id}, function (err, notice) {
            if (notice != null ){
                res.render('new_comentario', {data:notice});
            }
        });
    },
    commentCreate: function (req, res) {
        new_model.findOne({_id: req.body._id}, function (err, notice) {
            comentario = {
                    autor: req.body.autor,
                    mensaje: req.body.mensaje,
                    fecha: req.body.fecha
            };
            notice.comentarios.push(comentario);
            notice.save();
            res.redirect('notice')
        });
    }
};