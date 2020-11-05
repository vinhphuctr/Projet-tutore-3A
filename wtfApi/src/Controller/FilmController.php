<?php

namespace App\Controller;

use App\Entity\Film;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


class FilmController extends AbstractController
{
    /**
     * @Route("/api/film", name="film")
     */
    public function index()
    {
        return new Response(
            '
            <h1>Films</h1>
            <ul>
                <li><a href="film/get/all">GET ALL</a></li>
            </ul>'
        );
    }

    /**
    * @Route("/api/film/get/all", name="getAllFilms")
    */
    public function getAllFilms(){
        $repository = $this->getDoctrine()->getRepository(Film::class);
        $films = $repository->findAll();
        $json = json_encode(Film::serializeFilms($films));
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
    * @Route("/api/film/get/{id}", name="getFilmById")
    */
    public function getFilmById($id){
        $repository = $this->getDoctrine()->getRepository(Film::class);
        $film = $repository->find($id);      
        $json = json_encode($film->serializeFilm());
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
