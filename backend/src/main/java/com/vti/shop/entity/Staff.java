package com.vti.shop.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staff")
public class Staff {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String gender;
    private LocalDate dob;
    private String email;
    private String address;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
