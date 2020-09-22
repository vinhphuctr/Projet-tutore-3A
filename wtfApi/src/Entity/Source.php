<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Source
 *
 * @ORM\Table(name="source", indexes={@ORM\Index(name="c_source", columns={"id_score"})})
 * @ORM\Entity
 */
class Source
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_source", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idSource;

    /**
     * @var string
     *
     * @ORM\Column(name="nom_source", type="string", length=30, nullable=false)
     */
    private $nomSource;

    /**
     * @var \Score
     *
     * @ORM\ManyToOne(targetEntity="Score")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_score", referencedColumnName="id_score")
     * })
     */
    private $idScore;


}
