import Thread from '../../models/threadModel.js';

const deleteThread = (req, res) => {
  Thread.findByIdAndDelete(req.params.threadId)
    .then((result) => {
      if (!result) {
        return res.status(404).json('Thread not found');
      }
      res.status(200).json('Thread deleted');
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

export default deleteThread;