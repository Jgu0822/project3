package org.project2.omwp2.movie;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/movie")
public class MovieController {



    @GetMapping({"/todaymovie"})
    public String movie(){

        return "movie/todaymovie";
    }

    @GetMapping("/weekendmovie")
    public String weekend(){

        return "movie/weekendmovie";
    }

    @GetMapping("/searchmovie")
    public String newMovie(){

        return "movie/searchmovie";
    }

}
