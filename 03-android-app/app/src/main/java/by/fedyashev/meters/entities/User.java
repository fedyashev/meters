package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("id")
    private int id;

    @SerializedName("login")
    private String login;

    @SerializedName("role")
    private String role;

    @SerializedName("token")
    private String token;

    public User(int id, String login, String role, String token) {
        this.id = id;
        this.login = login;
        this.role = role;
        this.token = token;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
