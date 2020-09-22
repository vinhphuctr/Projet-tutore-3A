<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Serie
 *
 * @ORM\Table(name="serie")
 * @ORM\Entity
 */
class Serie
{
    /**
     * @var int
     *
     * @ORM\Column(name="nb_saison", type="integer", nullable=false)
     */
    private $nbSaison;

    /**
     * @var \Video
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Video")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_video", referencedColumnName="id_video")
     * })
     */
    private $idVideo;


}
