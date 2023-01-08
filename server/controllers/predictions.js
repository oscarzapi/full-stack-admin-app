import ProductStat from "../models/ProductStat.js"
import Prediction from '../models/Prediction.js'

export const getProductPredictions = async (req, res) => {
    try {
        // Get the filter search from front end as an string of products
        const {search=''} = req.query

        //split the previous string separated by commas and push each product to an array
let searchSplitted = [];

let splitted = search.split(",");

for (let i = 0; i < splitted.length; i++) {
  searchSplitted.push(splitted[i]);
}
// Get the list of distinct products from MongoDB
        const listOfProducts = await ProductStat.distinct('productId')

        // Get the products filtered by the previous array of search with separated values
       /*   const productsFilteredAux = await ProductStat.find({
            productId: {$in: searchSplitted},
        })  */

        const predictionsFilteredAux = await Prediction.aggregate([
            { $match: {productId: {$in: searchSplitted}}},
            { $unwind: '$dailyData'},
            { $match: {'dailyData.date': {$gt: '2021-11-01', $lt:'2022-01-01'}}},
            { $group: {_id: '$productId', list: { $push: { 'date': '$dailyData.date','totalSales': '$dailyData.totalSales', 'future_date': '$dailyData.future_date','salesPrediction':'$dailyData.salesPrediction'  } }}} 
        ])

        const dataFilteredAux = await ProductStat.aggregate([
            { $match: {productId: {$in: searchSplitted}}},
            { $unwind: '$dailyData'},
            { $match: {'dailyData.date': {$gt: '2021-11-01'}}},
            { $group: {_id: '$productId', list: { $push: { 'date': '$dailyData.date','totalSales': '$dailyData.totalSales' } }}} 
        ])

        const predictionsFiltered = []

        const dataFiltered = []

        function stringToColor(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
              hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            let color = '#';
            for (let i = 0; i < 3; i++) {
              let value = (hash >> (i * 8)) & 0xFF;
              color += ('00' + value.toString(16)).substr(-2);
            }
            return color;
          }

        

        dataFilteredAux.map(product => {
            const data = []
            product.list.forEach(object => {
                data.push({'x':object.date, 'y':object.totalSales})
            })
            predictionsFiltered.push({'id':product._id+Math.floor(Math.random() * 4), 'color':stringToColor(product._id), 'data':data})
        })
        predictionsFilteredAux.map(prediction => {
            const data = []
            prediction.list.forEach(object => {
                data.push({'x':object.future_date, 'y':object.salesPrediction})
            })
            predictionsFiltered.push({'id':prediction._id, 'color':stringToColor(prediction._id), 'data':data})
        })
         
        const results = {
            'listOfProducts':listOfProducts,
         //'dataFiltered': dataFiltered,
        'predictionsFiltered': predictionsFiltered,
    'predictionsFilteredAux': predictionsFilteredAux,
'searchSplitted': searchSplitted}
        res.status(200).json(results)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}