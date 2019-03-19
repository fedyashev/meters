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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inspector_main_menu);

        User user = AppStorage
                .getInstance()
                .getUser();

        final InspectorMainMenu context = this;
        final TextView tvInfo = this.findViewById(R.id.tvInfo);

        Button btnPlaces = this.findViewById(R.id.btnPlaces);
        btnPlaces.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(InspectorMainMenu.this, PlaceListActivity.class));
            }
        });

        Button btnScan = this.findViewById(R.id.btnQRScanner);
        btnScan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, QrScanner.class);
                context.startActivity(intent);
            }
        });

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

                                tvInfo.setText(inspector.getId() + "\n" + inspector.getLogin() + "\n" + inspector.getName());
                            }
                            else {
                                Gson gson = new Gson();
                                try {
                                    Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                    Toast.makeText(context, error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }
                        }

                        @Override
                        public void onFailure(Call<Inspector> call, Throwable t) {
                            Toast.makeText(context, t.getMessage(), Toast.LENGTH_SHORT).show();
                            t.printStackTrace();
                        }
                    });
        }
    }
}
