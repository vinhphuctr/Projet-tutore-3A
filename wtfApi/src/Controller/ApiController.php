<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class ApiController extends AbstractController
{
    /**
     * @Route("/api", name="api")
     */
    public function index()
    {
        return new Response(
            '
            <h1>API Homepage</h1>
            <ul>
                <li><a href="api/video">Videos</a></li>
                <li><a href="api/serie">Series</a></li>
                <li><a href="api/film">Films</a></li>
            </ul>'
        );
    }
}
