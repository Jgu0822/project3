package org.project2.omwp2.weather;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/weather")
public class WeatherController {

    @GetMapping("/index")
    public String weatherIndex(){
        return "weather/weatherIndex";
    }
}
