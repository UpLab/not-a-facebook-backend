import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    body: 'String',
    createdBy: { type: 'ObjectId', ref: 'User' },
  },
  { timestamps: true },
);

PostSchema.statics.findPostByUserId = function getPostByUserId(userId, limit) {
  return this.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .limit(limit || 0);
};

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
