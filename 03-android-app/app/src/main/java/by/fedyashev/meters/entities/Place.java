package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

public class Place {

    @SerializedName("id")
    private int id;

    @SerializedName("name")
    private String name;

    @SerializedName("consumer")
    private Consumer consumer;

    @SerializedName("meter")
    private Meter meter;

    @SerializedName("isSignNeed")
    private boolean isSignNeed;

    public Place(int id, String name, Consumer consumer, Meter meter, boolean isSignNeed) {
        this.id = id;
        this.name = name;
        this.consumer = consumer;
        this.meter = meter;
        this.isSignNeed = isSignNeed;
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

    public Consumer getConsumer() {
        return consumer;
    }

    public void setConsumer(Consumer consumer) {
        this.consumer = consumer;
    }

    public Meter getMeter() {
        return meter;
    }

    public void setMeter(Meter meter) {
        this.meter = meter;
    }

    public boolean isSignNeed() {
        return isSignNeed;
    }

    public void setSignNeed(boolean signNeed) {
        isSignNeed = signNeed;
    }
}
