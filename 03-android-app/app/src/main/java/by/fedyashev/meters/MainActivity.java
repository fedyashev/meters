package by.fedyashev.meters;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.io.IOException;

import by.fedyashev.meters.entities.Error;
import by.fedyashev.meters.entities.User;
import by.fedyashev.meters.service.NetworkService;
import by.fedyashev.meters.storage.AppStorage;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        AppStorage
                .getInstance()
                .clear();

        Button btnLogin = this.findViewById(R.id.btnLogin);

        final EditText etLogin = this.findViewById(R.id.etLogin);
        final EditText etPassword = this.findViewById(R.id.etPassword);

        final MainActivity context = this;

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String login = etLogin.getText().toString();
                String password = etPassword.getText().toString();

                NetworkService
                        .getInstance()
                        .getAuthApi()
                        .authLogin(login, password)
                        .enqueue(new Callback<User>() {
                            @Override
                            public void onResponse(Call<User> call, Response<User> response) {
                                User user = response.body();
                                if (response.isSuccessful() && user != null) {

                                    if (!user.getRole().equalsIgnoreCase("inspector")) {
                                        Toast.makeText(context, "Incorrect login or password", Toast.LENGTH_SHORT).show();
                                        return;
                                    }

                                    AppStorage
                                            .getInstance()
                                            .setUser(user);

                                    Intent intent = new Intent(context, InspectorMainMenu.class);
                                    context.startActivity(intent);
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
                            public void onFailure(Call<User> call, Throwable t) {
                                Toast.makeText(context, t.getMessage(), Toast.LENGTH_SHORT).show();
                                t.printStackTrace();
                            }
                        });
            }
        });


    }
}
