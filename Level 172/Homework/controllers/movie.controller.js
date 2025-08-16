const movies = [
    {
        id: 1,
        name: "Run Lola Run",
        director: "Tom Tykwer",
        rating: 7.6,
        year: 1998
    },
    {
        id: 2,
        name: "A Ghost Story",
        director: "David Lowery",
        rating: 6.8,
        year: 2017
    },
    {
        id: 3,
        name: "The Fall",
        director: "Tarsem Singh",
        rating: 7.8,
        year: 2006
    },
    {
        id: 4,
        name: "Waking Life",
        director: "Richard Linklater",
        rating: 7.7,
        year: 2001
    },
    {
        id: 5,
        name: "The Secret in Their Eyes",
        director: "Juan José Campanella",
        rating: 8.2,
        year: 2009
    }
];

const getMovies = (req, res) => {
    res.json(movies);
};

const getMovieById = (req, res) => {
    const { id } = req.params;

    const movie = movies.find(movie => movie.id === id * 1);

    if(!movie){
        return res.status(404).json({
            status: "Fail",
            message: "Movie not found"
        })
    }

    res.json(movie);
};

const createMovie = (req, res) => {
    const { director, rating, name, year } = req.body;

    if(!director || !rating || !name || !year){
        return res.status(400).json({
            status: "Fail",
            message: 'All fields are required director, rating, name, year'
        })
    }

    const newMovie = {
        id: movies[movies.length - 1].id + 1 || 1,
        director,
        rating,
        name,
        year
    }

    movies.push(newMovie);

    res.status(201).json(newMovie);
};

const updateMovie = (req, res) => {
    const { id } = req.params;
    const { director, rating, name, year } = req.body;

    const movie = movies.find(movie => movie.id === id * 1);

    if(!movie){
        return res.status(404).json({
            status: 'Fail',
            message: 'Movie not found'
        })
    }

    if(director !== undefined) movie.director = director;
    if(rating !== undefined) movie.rating = rating;
    if(name !== undefined) movie.name = name;
    if(year !== undefined) movie.year = year;

    res.status(200).json(movie);
};

const deleteMovie = (req, res) => {
    const { id } = req.params;

    const movieIndex = movies.findIndex(movie => movie.id === id * 1);

    if(movieIndex === -1){
        return res.json(404).json({
            status: "Fail",
            message: "Movie not found"
        })
    }

    movies.splice(movieIndex, 1);

    res.status(204).send();
};

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};