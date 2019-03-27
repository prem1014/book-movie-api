"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = require("./modal");
class MoviesCrud {
    saveMovie(req, db) {
        let movies = db.collection('tbl-movies');
        let movieDetails = new modal_1.default(req.body._id, req.body.movieName, req.body.movieDescription, req.body.cinemaHallId, req.body.startDate, req.body.endDate, req.body.screen);
        console.log(movieDetails);
        return movies.insertOne(movieDetails)
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
    getMovies(req, db) {
        let movies = db.collection('tbl-movies');
        return movies.find({}).toArray()
            .then(result => {
            return { success: true, list: result };
        })
            .catch(err => {
            return err;
        });
    }
    updateMovie(req, db) {
        let movies = db.collection('tbl-movies');
        return movies.update({ _id: req.params.id }, { $set: {
                movieName: req.body.movieName,
                movieDescription: req.body.movieDescription,
                cinemaHallId: req.body.cinemaHallId,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                screen: req.body.screen
            }
        })
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
    deleteMovie(req, db) {
        let movies = db.collection('tbl-movies');
        return movies.remove({ _id: req.params.id })
            .then(result => {
            return result;
        })
            .catch(err => {
            return err;
        });
    }
}
exports.default = new MoviesCrud();
//# sourceMappingURL=crud.js.map