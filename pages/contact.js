
import styles from '../styles/Home.module.scss'
import React, { useState, useEffect } from 'react';
import { faAngleLeft, faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import Router from 'next/router';


export default function Contact() {

    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
      
    }, [])


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
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                                <input required type="text" className="form-control" placeholder="Ingresa tu nombre" onChange={(event) => {
                                    setName(event.target.value)
                                }}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                                <input required type="email" className="form-control" placeholder="Ingresa tu email" onChange={(event) => {
                                    setEmail(event.target.value)
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Asunto</label>
                                <textarea required className="form-control" placeholder="Ingresa el asunto" onChange={(event) => {
                                    setSubject(event.target.value)
                                }}  ></textarea>
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
