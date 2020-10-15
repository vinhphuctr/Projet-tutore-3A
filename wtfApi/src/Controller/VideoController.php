<?php

namespace App\Controller;

use App\Entity\Video;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class VideoController extends AbstractController
{
    // Paramètres de recherche autorisés dans le GET
    const AUTORIZED_PARAMETERS = array('idVideo', 'titre', 'plot', 'vo', 'idProd');
    /**
     * @Route("/video", name="video")
     */
    public function index()
    {
        return $this->json([
            'message' => 'Ajoutez /get à cette route pour récupérer les vidéos'
        ]);
    }

    /**
    * @Route("/video/get/", name="getVideo")
    */
    public function getVideo(Request $request){
        $parameters = $request->query->all();

        if(count($parameters) < 1) return new Response('Aucun paramètre GET renseigné');
        foreach($parameters as $key=>$param) {
            if(!in_array($key, self::AUTORIZED_PARAMETERS)){
                $json = json_encode(array("message" => "Paramètre GET non reconnu : " . $key));
                $response = new Response($json);
                $response->headers->set('Content-Type', 'application/json');
                return $response;
            }
        }

        $repository = $this->getDoctrine()->getRepository(Video::class);
        $videos = $repository->findVideo($parameters);
        $json = json_encode($videos);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
    * @Route("/video/get/all/", name="getAllVideo")
    */
    public function getAllVideos(){
        $repository = $this->getDoctrine()->getRepository(Video::class);
        $videos = $repository->findAll();
        $json = json_encode($videos);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
