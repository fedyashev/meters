package by.fedyashev.meters.entities;

import com.google.gson.annotations.SerializedName;

public class Place {
    @SerializedName("name")
    private String name;

    @SerializedName("consumer")
    private Consumer consumer;

    @SerializedName("meter")
    private Meter meter;

    @SerializedName("isSignNeed")
    private boolean isSignNeed;

    public Place(String name, Consumer consumer, Meter meter, boolean isSignNeed) {
        this.name = name;
        this.consumer = consumer;
        this.meter = meter;
        this.isSignNeed = isSignNeed;
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
