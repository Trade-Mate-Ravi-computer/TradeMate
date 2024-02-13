package com.trademate.project.Service;

import com.trademate.project.Model.UserModel;
import com.trademate.project.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserModel> getUsers(){
        return userRepository.findAll();
    }
    public UserModel addUser(UserModel userModel){
        userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));
        return userRepository.save(userModel);
    }
    public UserModel getByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
