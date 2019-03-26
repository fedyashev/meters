package by.fedyashev.meters;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.util.DisplayMetrics;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

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

    Button btnClearSign;

    PaintView pvSign;

    CardView cardSign;

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

        pvSign = findViewById(R.id.pvSign);
        DisplayMetrics metrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(metrics);
        pvSign.init(metrics);

        cardSign = findViewById(R.id.cardSign);

        btnClearSign = findViewById(R.id.btnClearSign);
        btnClearSign.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pvSign.clear();
            }
        });

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

            if (!place.isSignNeed()) {
                cardSign.setVisibility(View.GONE);
            }

        } else {
            Toast.makeText(PlaceAddDataActivity.this, "Место не найдено", Toast.LENGTH_SHORT).show();
        }
    }
}
