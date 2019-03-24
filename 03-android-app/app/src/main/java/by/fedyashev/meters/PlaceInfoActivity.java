package by.fedyashev.meters;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import by.fedyashev.meters.entities.Consumer;
import by.fedyashev.meters.entities.Meter;
import by.fedyashev.meters.entities.Place;

public class PlaceInfoActivity extends AppCompatActivity {

    TextView tvId;
    TextView tvName;
    TextView tvConsumer;
    TextView tvMeter;
    TextView tvIsSignNeed;

    Place place;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_info);

        tvId = findViewById(R.id.tvId);
        tvName = findViewById(R.id.tvName);
        tvConsumer = findViewById(R.id.tvConsumer);
        tvMeter = findViewById(R.id.tvMeter);
        tvIsSignNeed = findViewById(R.id.tvIsSignNeed);

        place = (Place) getIntent().getSerializableExtra(Place.class.getCanonicalName());

        if (place != null) {
            Consumer consumer = place.getConsumer();
            Meter meter = place.getMeter();
            tvId.setText(place.getId() + "");
            tvName.setText(place.getName());
            tvConsumer.setText(consumer != null ? consumer.getName() : "---");
            tvMeter.setText(meter != null ? meter.getNumber() : "---");
            tvIsSignNeed.setText(place.isSignNeed() ? "Подпись - ДА" : "Подпись - НЕТ");
        }
    }
}
