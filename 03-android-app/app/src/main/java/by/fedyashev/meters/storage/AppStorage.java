package by.fedyashev.meters.storage;

import by.fedyashev.meters.entities.Inspector;
import by.fedyashev.meters.entities.User;

public class AppStorage {
    private static AppStorage instance;

    private User user;
    private Inspector inspector;

    private AppStorage() {
        this.clear();
    }

    public static AppStorage getInstance() {
        if (instance == null) {
            instance = new AppStorage();
        }
        return instance;
    }

    public void clear() {
        user = null;
        inspector = null;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Inspector getInspector() {
        return inspector;
    }

    public void setInspector(Inspector inspector) {
        this.inspector = inspector;
    }
}
