import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide your title'],
  },
  body: {
    type: String,
    required: [true, 'Please provide a body'],
  },
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
