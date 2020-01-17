package com.adobe.summit.l740.core.models;

public class Contributor {

    private String title;
    private String path;

    public Contributor(String title, String path){
        setTitle(title);
        setPath(path);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

}
