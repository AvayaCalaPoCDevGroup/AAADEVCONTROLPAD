/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.AAADEVCONTROLPAD.Bean;

import java.io.Serializable;
/**
 *
 * @author umansilla
 */
public class Usuario implements Serializable{

	private static final long serialVersionUID = 1L;
	private int id;
    private String name;
    private String username;
    private String password;
    private String fecha;
    private String hora;
    private String phone;
    private String country;
    private String language;


    public Usuario() {
    }
    
    public Usuario(int id, String name, String username, String fecha, String hora, String phone, String country) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.fecha = fecha;
        this.hora = hora;
        this.phone = phone;
        this.country = country;
    }

    public Usuario(int id, String name, String username, String fecha, String hora, String phone, String country, String language) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.fecha = fecha;
        this.hora = hora;
        this.phone = phone;
        this.country = country;
        this.language = language;
    }
    
    
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
