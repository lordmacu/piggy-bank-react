
import styles from '../styles/Home.module.scss'
import React, { useState, useEffect } from 'react';
import { faAngleLeft, faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import Router from 'next/router';
import { useForm } from "react-hook-form";
import axios from 'axios';


export default function Contact() {
 
    const { register, formState: { errors }, handleSubmit } = useForm();
 

    function onSubmit(data) {
        
        axios({
            method: 'post',
            url: 'https://apipiggy.cristiangarcia.co/email',
            data: data
        })
            .then(() => {
                swal("Se ha enviado el email correctamente");
                document.getElementById("formContact").reset();

            }).catch(function (error) {
                swal("Error al envio del email");
            }); ;
       
        return false;
    }

 


    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.headerApp}>
                    <button title='Depositar' className={styles.buttonCicle} onClick={() => {
                        Router.push("/");
                    }}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <span>Contacto</span>
                </div>

   
                    <div className="mb-3 row">
                    <form id='formContact' onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                id='name'
                                {...register("name", {
                                required: "Required",
                                message: "Ingrese un nombre valido"
                                })}
                                type="text" className="form-control" placeholder="Ingresa tu nombre" />
                            {errors.name ? <span>{errors.name.message}</span> : ""} 

                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                            <input
                                {...register("email", {
                                required: "Required",
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "Ingrese un email válido"
                                })} 
                                id='email'
                                type="email" className="form-control" placeholder="Ingresa tu email" />
                         
                            {errors.email ? <span>{errors.email.message}</span> : "" } 

                            </div>
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">Asunto</label>
                            <textarea
                                {...register("subject", {
                                required: "Required",
                                message: "Ingrese un asunto valido"
                                })}
                                id='subject'
                                className="form-control" placeholder="Ingresa el asunto"    ></textarea>
                            {errors.subject ? <span>{errors.subject.message}</span> : ""} 

                            </div>
                            <div className="mb-3 d-grid gap-2">
                                <button className='btn btn-light ' type='submit'>Enviar</button>
                            </div>
                        </form>
                    </div>
                 
            </div>
        </div>
    )
}
