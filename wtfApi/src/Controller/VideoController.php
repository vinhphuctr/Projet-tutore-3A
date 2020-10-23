<?php

namespace App\Controller;

use App\Entity\Production;
use App\Entity\Video;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Serializer;

class VideoController extends AbstractController
{
    // Paramètres de recherche autorisés dans le GET
    const AUTORIZED_PARAMETERS = array('idVideo', 'titre', 'plot', 'vo', 'idProd');
    /**
     * @Route("/api/video", name="video")
     */
    public function index()
    {
        return $this->json([
            'message' => 'Ajoutez /get à cette route pour récupérer les vidéos'
        ]);
    }

    /**
    * @Route("/api/video/get/", name="getVideo")
    */
    public function getVideo(Request $request){
        $parameters = $request->query->all();
        

        if(count($parameters) < 1){
            return $this->json([
                'message' => 'Aucun paramètre GET renseigné'
            ]);
        }
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
    * @Route("/api/video/get/all/", name="getAllVideo")
    */
    public function getAllVideos(){
        $repository = $this->getDoctrine()->getRepository(Video::class);
        $videos = $repository->findAll();
        
        dump($videos);

        $data = array('videos' => array());
        foreach($videos as $video){
            $data['videos'][] = $this->serializeVideos($video);
            // if(!is_null($video->getProduction()))
            //     dump($video->getProduction()->getNom());
        }
        
        return new Response('<html><body></body></html>');

        // $response = new Response(json_encode($data),200);
        // $response->headers->set('Content-Type', 'application/json');
        // return $response;
    }

    private function serializeVideos(Video $video){
        return array(
            'idVideo' => $video->getIdVideo(),
            'titre' => $video->getTitre(),
            'dateSortie' => $video->getDateSortie(),
            'poster' => $video->getPoster(),
            'plot' => $video->getPlot(),
            'trailer' => $video->getTrailer(),
            'vo' => $video->getVo(),
            'production' => (!is_null($video->getProduction())) ? array(
                 'id' => $video->getProduction()->getId(),
                 'nom' => $video->getProduction()->getNom(),
            ) : null,
            'next' => null
        );
    }

    /**
    * @Route("/api/video/get/{id}", name="getVideoById")
    */
    public function getVideoById($id){
        $repository = $this->getDoctrine()->getRepository(Video::class);
        $video = $repository->findVideo(['idVideo' => $id]);
        // $video = $this->getDoctrine()->getRepository(Video::class)->findBy(['idVideo' => $id]);
        
        $json = json_encode($video);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');

        return $response;

        // return new Response("<html><body></body></html>");
    }


}
