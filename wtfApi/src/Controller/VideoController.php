<?php

namespace App\Controller;

use App\Entity\Video;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class VideoController extends AbstractController
{
    /**
     * @Route("/video", name="video")
     */
    public function index()
    {
        // $repository = $this->getDoctrine()->getRepository(Video::class);
        // $videos = $repository->findByTitre("Casino");
        // dump($videos);

        $repository = $this->getDoctrine()->getRepository(Video::class);
        $search = array(
            // 'plot' => 'life'
            'plot' => '%gambling%'
            // 'idVideo' => 524
        );
        $videos = $repository->findVideo($search);
        // dump(json_encode($videos));

        $json = json_encode($videos);
        $response = new Response($json);
        // $response->headers->set('Content-Type', 'application/json');
        
        // return new Reponse("<body>".$json_encode($videos)."</body>");

        return new Response("<html><body>$json</body></html>");
    }

    /** 
     * @Route("/video/get/", name="getVideo")
    */
    public function getVideo(Request $request){
        /* Recherches possibles :
        *
        *   Titre, Date de sortie, VO, idProd, nomProd (jointure)
        *   
        *
        * => http://wtfilm/video/get/?titre=Inception&sortie=2010
        * 
        */
        $parameters = $request->query; // parameters est le tableau de tous les paramètres get
        dump($parameters);
        $obj->titre = "Inception";
        $obj->sortie = "2010";
        $returnedJson = json_encode($obj);
        return new Response("<html><body>$returnedJson</body></html>");
    }
}
