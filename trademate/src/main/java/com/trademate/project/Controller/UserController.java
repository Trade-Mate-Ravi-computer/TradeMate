package com.trademate.project.Controller;

import com.trademate.project.Model.UserModel;
import com.trademate.project.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = {"http://localhost:3000","https://trade-mate-1j4p.vercel.app/"})
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/signup")
    public ResponseEntity<UserModel> signup(@RequestBody UserModel userModel){
        return new ResponseEntity<UserModel>(userService.addUser(userModel), HttpStatus.CREATED);
    }
    @GetMapping("/allusers")
    public List<UserModel> getAllUsers(){
        return userService.getUsers();
    }
@PostMapping("/byemail")
    public UserModel getByEmail(@RequestBody UserModel user){
        return userService.getByEmail(user.getEmail());
}
}
