package com.krishimela.dto;

import com.krishimela.entity.Role;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
