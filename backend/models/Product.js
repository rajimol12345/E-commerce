import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Brand' },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true },
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive', 'Out of Stock'] },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;

