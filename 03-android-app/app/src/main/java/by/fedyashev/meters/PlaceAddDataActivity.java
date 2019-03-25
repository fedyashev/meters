package by.fedyashev.meters;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import by.fedyashev.meters.entities.Consumer;
import by.fedyashev.meters.entities.Data;
import by.fedyashev.meters.entities.Meter;
import by.fedyashev.meters.entities.Place;

public class PlaceAddDataActivity extends AppCompatActivity {

    TextView tvPlaceName;
    TextView tvConsumer;
    TextView tvMeterNumber;
    TextView tvIsSignNeed;
    TextView tvLastDate;
    TextView tvLastValue;

    Place place;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_add_data);

        initViews();
    }

    private void initViews() {
        tvPlaceName = findViewById(R.id.tvPlaceName);
        tvConsumer = findViewById(R.id.tvConsumer);
        tvMeterNumber = findViewById(R.id.tvMeterNumber);
        tvIsSignNeed = findViewById(R.id.tvIsSignNeed);
        tvLastDate = findViewById(R.id.tvLastDate);
        tvLastValue = findViewById(R.id.tvLastValue);

        place = (Place) getIntent().getSerializableExtra(Place.class.getCanonicalName());

        if (place != null) {
            Consumer consumer = place.getConsumer();
            Meter meter = place.getMeter();
            tvPlaceName.setText(place.getName());
            tvConsumer.setText(consumer != null ? consumer.getName() : "---");
            tvMeterNumber.setText(meter != null ? meter.getNumber() : "---");
            tvIsSignNeed.setText(place.isSignNeed() ? "ДА" : "НЕТ");

            Data lastData = meter != null ? meter.getLastData() : null;

            if (lastData != null) {
                tvLastDate.setText(android.text.format.DateFormat.format("dd.MM.yyyy HH:mm:ss", lastData.getDate()));
                tvLastValue.setText(Integer.toString(lastData.getValue()));
            } else {
                tvLastDate.setText("---");
                tvLastValue.setText("---");
            }
        }
    }
}
