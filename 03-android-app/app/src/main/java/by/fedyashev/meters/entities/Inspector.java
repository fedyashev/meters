package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

public class Inspector {
    @SerializedName("id")
    private int id;

    @SerializedName("name")
    private String name;

    @SerializedName("login")
    private String login;

    public Inspector(int id, String name, String login) {
        this.id = id;
        this.name = name;
        this.login = login;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
