const router = require('express').Router();
const Category = require('../models/category.model');
// const CategorySession = require('../models/usersession.model');

router.route('/add').post((req, res)=>{
    // console.log(req.body.post_image[0].name);
    // console.log(req);
            
            Category.find()
            .then(categories=>{
                const category = req.body.post_category;
                if(categories.length != 0){
                    var category_id = categories[categories.length - 1].category_id + 1;
                } else {
                    category_id = 1;
                }
                
                console.log(req.body.post_category);
                // console.log(categories[categories.length - 1].category_id +1);

                const newCategory =  new Category({
                    category,
                    category_id
                });
                console.log(newCategory);
                newCategory.save()
                .then(()=>res.json('new category added: '+ category))
                .catch((err) => {res.status(400).json('Error2: '+ err); console.log(err)})
        
            })
            .catch(err => res.status(400).json('Error: '+ err))     
});


router.route('/').get((req, res)=>{
    Category.find()
    .then((categories)=>res.json(categories))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').get((req, res)=>{
    Category.findById(req.params.id)
    .then(category=>res.json(category))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').delete((req, res)=>{
    Category.findByIdAndDelete(req.params.id)
    .then(()=>res.json('category deleted SUCCESFULLY'))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/update/:id').post((req, res)=>{

    Category.findById(req.params.id)
    .then(categories=>{
        const category = req.body.category;

        categories.save()
        .then(()=>res.json(`category${category} updated`))
        .catch(err => res.status(400).json('Error: '+err))
    })
    .catch(err => res.status(400).json('Error: '+err))
});


module.exports = router;