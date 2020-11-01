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
        $films = $repository->find(5);

        dump($films->getIdVideo()->serializeVideos());
        dump($films->getIdVideo());

        $response = new Response(json_encode($films->getIdVideo()->serializeVideos()),200);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

        return new Response('<html><body>Films</body></html>');


        $result = $films[0];

        $encoder = new JsonEncoder();
        $normalizer = new ObjectNormalizer();
        $serializer = new Serializer($normalizer, $encoder);

        $jsonContent = $serializer->serialize($result, 'json');
        echo $jsonContent;
        
        // var_dump($result);
        // TODO à continuer... il faut serializer comme dans vidéo
        // + fetch="EAGER" à retenir dans les entities !

        return new Response('<html><body>Coucou!</body></html>');
    }

    /**
    * @Route("/api/film/get/{id}", name="getFilmById")
    */
    public function getFilmById($id){
        $repository = $this->getDoctrine()->getRepository(Film::class);
        $video = $repository->find($id);        
        $json = json_encode($video);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');

        return $response;

        // return new Response("<html><body></body></html>");
    }
}
