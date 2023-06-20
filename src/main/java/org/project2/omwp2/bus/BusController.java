package org.project2.omwp2.bus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bus")
public class BusController {

    @GetMapping({"/","/index"})
    public String busindex(){

        return "bus/busIndex";
    }

}
