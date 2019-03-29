package by.fedyashev.meters;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.io.IOException;

import by.fedyashev.meters.entities.Error;
import by.fedyashev.meters.entities.Inspector;
import by.fedyashev.meters.entities.User;
import by.fedyashev.meters.service.NetworkService;
import by.fedyashev.meters.storage.AppStorage;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class InspectorMainMenu extends AppCompatActivity {

    TextView tvInfo;

    Button btnPlaces;
    Button btnActs;
    Button btnScan;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inspector_main_menu);
        initViews();
    }

    @Override
    protected void onResume() {
        super.onResume();
        fillContent();
    }

    private void initViews() {
        tvInfo = this.findViewById(R.id.tvInfo);

        btnPlaces = this.findViewById(R.id.btnPlaces);
        btnPlaces.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(InspectorMainMenu.this, PlaceListActivity.class));
            }
        });

        btnActs = findViewById(R.id.btnActs);
        btnActs.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(InspectorMainMenu.this, Act01ListActivity.class));
            }
        });

        btnScan = this.findViewById(R.id.btnQRScanner);
        btnScan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(InspectorMainMenu.this, QrScanner.class));
            }
        });
    }

    private void fillContent() {
        User user = AppStorage
                .getInstance()
                .getUser();

        if (user != null) {
            NetworkService
                    .getInstance()
                    .getMeterApi()
                    .getInspectorByUserId("BEARER " + user.getToken(), user.getId())
                    .enqueue(new Callback<Inspector>() {
                        @Override
                        public void onResponse(Call<Inspector> call, Response<Inspector> response) {
                            if (response.isSuccessful()) {
                                Inspector inspector = response.body();
                                AppStorage
                                        .getInstance()
                                        .setInspector(inspector);

                                tvInfo.setText(inspector.getName());
                            }
                            else {
                                Gson gson = new Gson();
                                try {
                                    Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                    Toast.makeText(InspectorMainMenu.this, error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }
                        }

                        @Override
                        public void onFailure(Call<Inspector> call, Throwable t) {
                            Toast.makeText(InspectorMainMenu.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                            t.printStackTrace();
                        }
                    });
        }
    }
}
