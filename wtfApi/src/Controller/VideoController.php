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
        $response->headers->set('Content-Type', 'application/json');
        return $response;
        // return new Response("<html><body>$json</body></html>");
    }
}
