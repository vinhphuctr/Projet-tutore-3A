<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Video;

class VideoController extends AbstractController
{
    /**
     * @Route("/video", name="video")
     */
    public function index()
    {
        $repository = $this->getDoctrine()->getRepository(Video::class);
        $video = $repository->findByTitre("Casino");
        dump($video);
        return new Response();
    }
}
