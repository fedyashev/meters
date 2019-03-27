package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Date;

public class Sign implements Serializable {

    @SerializedName("id")
    int id;

    @SerializedName("filename")
    String filename;

    @SerializedName("date")
    Date date;

    public Sign(int id, String filename, Date date) {
        this.id = id;
        this.filename = filename;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
