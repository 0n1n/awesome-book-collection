package com.ninotynkkynen.awesomebookcollection;

import org.springframework.web.bind.annotation.RequestMapping;

public class GuiController {
    @RequestMapping(value = "/")
    public String index() {
        return "index";    
    }
}
