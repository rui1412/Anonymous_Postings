var Userdb = require('../model/model')

//create and save Course
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be emtpy"})
        return;
    }

    //new post
    const course = new Userdb({
        post:req.body.post
    })

    //save data in the database
    course
        .save(course)
        .then(data =>{
            //res.send(data)
            res.redirect('/')
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Some error occurred"
            });
        });
}

//retrieve and return all Post / retrive and return a single Post
exports.find = (req,res)=> {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Coudln't find Post with id: " + id})
                } else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving Post with id: " + id})
            })

    } else {
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occured when retriving data"})
        })
    }


}

//update a Course
exports.update = (req,res)=> {
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data can't update"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot update data with ${id}`})
            } else {
                res.send(data)
            }
        })
        .catch (err=>{
            res.status(500).send({message:"Error Update"})
        })
}

//delete a Course
exports.delete = (req,res)=> {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Cannot delete data, maybe id is wrong: ${id}`})
            } else {
                res.send({
                    message:"Post was sucessfully deleted!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete Post with id: " + id
            });
        });
}