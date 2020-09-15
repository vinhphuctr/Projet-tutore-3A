<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class FilmController extends AbstractController
{
    public function index()
    {
        return $this->render('film/index.html.twig', [
            'controller_name' => 'FilmController',
        ]);
        
    }
}
