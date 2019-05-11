const Stream = require('../models/stream');

class StreamController {
	async streamer(req, res) {
		try {
			const stream = await Stream.create(req.body);

			return res.json({
				stream
			});
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao adicionar streamer' });
		}
	}

	async show(req, res) {
		try {
			const stream = await Stream.findById(req.params.id);

			return res.json(stream);
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao exibir streamer' });
		}
	}

	async streams(req, res) {
		try {
			const stream = await Stream.find(req.body).setOptions({
				sort: {
					createdAt: -1
				}
			});

			return res.json({
				stream
			});
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao exibir streamer' });
		}
	}

	async del(req, res, next) {
		try {
			await Stream.findByIdAndDelete(req.params.id);
			res.status(200).send({ message: 'Streamer deletado!' });

			next();
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao deletar streamer' });
		}
	}
}

module.exports = new StreamController();
