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

public class MainActivity extends AppCompatActivity {

    EditText etLogin;
    EditText etPassword;
    Button btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
    }

    @Override
    protected void onResume() {
        super.onResume();
        clearState();
    }

    private void initViews() {
        btnLogin = this.findViewById(R.id.btnLogin);
        etLogin = this.findViewById(R.id.etLogin);
        etPassword = this.findViewById(R.id.etPassword);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                login();
            }
        });
    }

    private void clearState() {
        AppStorage
                .getInstance()
                .clear();
    }

    private void login() {
        String login = etLogin.getText().toString();
        String password = etPassword.getText().toString();

        if (!login.matches("^\\w{2,16}$") || !password.matches("^\\w{2,16}$")) {
            Toast.makeText(MainActivity.this, "Неправильный логин или пароль", Toast.LENGTH_SHORT).show();
            return;
        }

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
                                Toast.makeText(MainActivity.this, "Неправильный логин или пароль", Toast.LENGTH_SHORT).show();
                                return;
                            }

                            AppStorage
                                    .getInstance()
                                    .setUser(user);

                            Intent intent = new Intent(MainActivity.this, InspectorMainMenu.class);
                            startActivity(intent);
                        }
                        else {
                            Gson gson = new Gson();
                            try {
                                Error error = gson.fromJson(response.errorBody().string(), Error.class);
                                Toast.makeText(MainActivity.this, error.getError().getCode() + " - " + error.getError().getMessage(), Toast.LENGTH_SHORT).show();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {
                        Toast.makeText(MainActivity.this, t.getMessage(), Toast.LENGTH_SHORT).show();
                        t.printStackTrace();
                    }
                });
    }
}
