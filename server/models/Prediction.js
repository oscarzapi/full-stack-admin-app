import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema(
  {
    productId: String,
    dailyData: [
      {
        date: String,
        totalSales: Number,
        future_date: String,
        salesPrediction: Number
      }
    ]
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", PredictionSchema);
export default Prediction;