/* eslint-disable class-methods-use-this */
import PostModel from '../models/post';

class PostsService {
  add({ createdBy, body }) {
    // TODO: validate
    return PostModel.create({ createdBy, body });
  }

  get() {
    // TODO: validate
    return PostModel.find({}).sort({ createdAt: -1 });
  }

  getPostsByUserId() {
    // TODO: validate
    return PostModel.findPostByUserId({});
  }

  remove(_id) {
    // TODO: validate
    return PostModel.remove({ _id });
  }

  update(postId, body) {
    // TODO: validate
    return PostModel.update({ _id: postId }, { $set: { body } });
  }
}

export default new PostsService();
