<?php

namespace App\Controller;

use App\Entity\Serie;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class SerieController extends AbstractController
{
    /**
     * @Route("/api/serie", name="serie")
     */
    public function index()
    {
        return new Response(
            '
            <h1>Séries</h1>
            <ul>
                <li><a href="serie/get/all">GET ALL</a></li>
            </ul>'
        );
    }

    /**
    * @Route("/api/serie/get/all", name="getAllSeries")
    */
    public function getAllSeries(){
        $repository = $this->getDoctrine()->getRepository(Serie::class);
        $series = $repository->findAll();
        $allSeries = array();
        foreach ($series as $s) {
            $allSeries[] = $s->serializeSerie();
        }
        $json = json_encode($allSeries);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
    * @Route("/api/serie/get/{id}", name="getSerieById")
    */
    public function getSerieById($id){
        $repository = $this->getDoctrine()->getRepository(Serie::class);
        $series = $repository->find($id);
        $json = json_encode($series->serializeSerie());
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
